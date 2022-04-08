import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Task } from "@prisma/client";

import { db } from "utils/db.server";

type LoaderData = { tasks: Array<Task> };

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        tasks: await db.task.findMany(),
    };
    return json(data);
};

export default function Index() {
    const data = useLoaderData<LoaderData>();

    return (
        <div className="bg-white">
            <div className="relative overflow-hidden">
                <header className="relative">
                    <div className="bg-gray-900 pt-6">
                        <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
                            <div className="flex items-center flex-1">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <a href="#" className="text-white text-3xl">
                                        Remix Starter
                                    </a>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <button type="button" className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white" aria-expanded="false">
                                            <span className="sr-only">Open main menu</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden space-x-8 md:flex md:ml-10">
                                    <a href="#" className="text-base font-medium text-white hover:text-gray-300">Product</a>

                                    <a href="#" className="text-base font-medium text-white hover:text-gray-300">Features</a>

                                    <a href="#" className="text-base font-medium text-white hover:text-gray-300">Marketplace</a>

                                    <a href="#" className="text-base font-medium text-white hover:text-gray-300">Company</a>
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
                        <div className="mx-auto max-w-7xl lg:px-8">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                                    <div className="lg:py-24">
                                        <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                            <span className="block">A better way to</span>
                                            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">ship web apps</span>
                                        </h1>
                                        <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
                                        </p>
                                        <div className="mt-10 sm:mt-12">
                                            <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                                                <div className="sm:flex">
                                                    <div className="min-w-0 flex-1">
                                                        <label className="sr-only">Email address</label>
                                                        <input id="email" type="email" placeholder="Enter your email" className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"/>
                                                    </div>
                                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                                        <button type="submit" className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">
                                                            Start free trial
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                                                    Start your free 14-day trial, no credit card necessary. By providing your email, you agree to our
                                                    <a href="#" className="font-medium text-white">terms of service</a>.
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                                    <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                        <img className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                            <div className="mb-4">
                                <h1 className="text-2xl">
                                    Todo List
                                </h1>
                                <div className="flex mt-4">
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"/>
                                    <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                                </div>
                            </div>
                            <div>
                                {data.tasks.map((task) => (
                                    <div key={task.id} className="flex mb-4 items-center">
                                        <p className="w-full text-grey-darkest">{task.title}</p>
                                        <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                                        <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-50" aria-labelledby="footer-heading">
                    <h2 id="footer-heading" className="sr-only">Footer</h2>
                    <div className="max-w-md mx-auto px-4 sm:max-w-7xl sm:px-6 lg:px-8">
                        <div className="border-t border-gray-200 py-8">
                            <p className="text-base text-gray-400 xl:text-center">&copy; 2022 Remix Starter. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
