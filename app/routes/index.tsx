import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useTransition } from "@remix-run/react";
import type { Task } from "@prisma/client";
import { useRef, useEffect } from 'react'

import { db } from "utils/db.server";

type LoaderData = { tasks: Array<Task> };

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        tasks: await db.task.findMany({
            orderBy: [
                {
                    is_completed: 'asc',
                },
                {
                    created_at: 'desc',
                },
            ]
        }),
    };
    return json(data);
};

export let action: ActionFunction = async ({ request }) => {
    if (request.method === 'POST') {
        const data = new URLSearchParams(await request.text())
        const title = data.get('title') ?? ''
        const newTask = await db.task.create({
            data: { is_completed: false, title },
        })
        return json(newTask, {
            status: 201,
        })
    }

    if (request.method === 'DELETE') {
        const data = new URLSearchParams(await request.text())
        const taskId = data.get('task_id')

        if (!taskId)
            return json(
                { error: 'Task id must be defined' },
                {
                    status: 400,
                }
            )

        const task = await db.task.findUnique({
            where: {
                id: taskId,
            },
        })

        if (!task) {
            return json(
                { error: 'Task does not exist' },
                {
                    status: 400,
                }
            )
        }

        const deletedTask = await db.task.delete({
            where: {
                id: task.id,
            },
        })

        return json({ todo: deletedTask }, { status: 200 })
    }

    return null
}

export default function Index() {
    const data = useLoaderData<LoaderData>();

    let formRef = useRef<HTMLFormElement | null>(null)
    const transition = useTransition()

    useEffect(() => {
        if (transition.state === 'loading') {
            formRef.current?.reset()
        }
    }, [transition.state])

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="relative overflow-hidden">
                <header className="relative">
                    <div className="bg-gray-900 pt-6">
                        <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
                            <div className="flex items-center flex-1">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a href="#" className="text-white text-3xl">
                                        Remix Starter
                                    </a>
                                </div>
                            </div>
                            <div className="hidden md:flex md:items-center md:space-x-6">
                                <a href="#" className="text-base font-medium text-white hover:text-gray-300">
                                    Log in
                                </a>
                                <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                                    Start free trial
                                </a>
                            </div>
                        </nav>
                    </div>
                </header>

                <main>
                    <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                        <div className="max-w-2xl mx-auto flex justify-center px-4 sm:px-6">
                            <div className="py-5">
                                <h2 className="text-2xl text-white">
                                    Tasks
                                </h2>
                                <div className="flex mt-4">
                                    <Form ref={formRef} method="post">
                                        <div className="flex">
                                            <input name="title" className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-slate-900" placeholder="Add Todo"/>
                                            <button className="flex-no-shrink px-4 border-1 bg-blue-500 rounded text-white">Add</button>
                                        </div>
                                    </Form>
                                </div>

                                {/*{data.tasks.map((task) => (*/}
                                {/*    <div key={task.id} className="flex mb-4 items-center">*/}
                                {/*        <p className="text-white">{task.title}</p>*/}
                                {/*        <button className="flex-no-shrink p-2 ml-4 mr-2 bg-blue-500 rounded text-white">Done</button>*/}
                                {/*        <Form method="delete">*/}
                                {/*            <input hidden name="task_id" defaultValue={task.id} />*/}
                                {/*            <button className="flex-no-shrink p-2 ml-2 rounded bg-red-500">Remove</button>*/}
                                {/*        </Form>*/}
                                {/*    </div>*/}
                                {/*))}*/}

                                <fieldset className="space-y-5 pt-4">
                                    {data.tasks.map((task) => (
                                        <div key={task.id} className="relative flex items-start">
                                            <div className="flex items-center h-5 mt-1">
                                                <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                            </div>
                                            <div className="ml-3 text-xl">
                                                <span id="comments-description" className={`text-white text-base ${task.is_completed == true ? 'line-through' : ''}`}>{task.title} </span>
                                            </div>
                                        </div>
                                    ))}
                                </fieldset>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
