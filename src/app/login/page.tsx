import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col space-y-4 p-6">
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email:</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">Password:</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-4">
        <button 
          formAction={login}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log in
        </button>
        <button 
          formAction={signup}
          className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}