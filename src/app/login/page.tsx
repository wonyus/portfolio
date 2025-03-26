import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="pt-16">
      <form className="flex flex-col space-y-4 p-6 w-sm mx-auto border border-purple-950/80 rounded-lg bg-neutral-900">
        <div className="flex flex-col ">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-100">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="example@gmail.com"
            className="rounded-lg border border-gray-300/10 hover:border-gray-300/20  bg-none px-4 py-2 focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-100">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="********"
            className="rounded-lg border border-gray-300/10 hover:border-gray-300/20 bg-none px-4 py-2 focus:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            formAction={login}
            className="rounded-lg px-4 py-2 text-purple-800 hover:text-white bg-none border border-purple-800 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:border-purple-800 hover:cursor-pointer"
          >
            <span className="text-sm font-bold">LOG IN</span>
          </button>
          <button
            formAction={signup}
            className="rounded-lg px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:cursor-pointer"
          >
            <span className="text-sm">SIGN UP</span>
          </button>
        </div>
      </form>
    </div>
  );
}
