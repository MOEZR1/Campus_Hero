import React from 'react'

const addAdmin = () => {
  return (
    <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
    <div class="w-full md:w-1/2 py-10 px-5 md:px-10 bg-gray-300">
        <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">REGISTER</h1>
            <p>Enter the new admin information</p>
        </div>
        <form action="../account/auth/admin.php" method="post">

          
            <div class="">
                <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-bold px-1">Username</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-white text-lg"></i></div>
                                <input type="text" 
                                class=" rounded-lg text-gray-500 border-none bg-white w-full -ml-10 pl-10 pr-3 py-2 outline-none" 
                                placeholder="John"
                                name="username"/>
                            </div>
                        </div>
            
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-bold px-1">Email</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-lg"></i></div>
                                <input type="email" 
                                class=" rounded-lg text-gray-500 border-none bg-white w-full -ml-10 pl-10 pr-3 py-2 outline-none" 
                                placeholder="johnsmith@example.com" 
                                name="email"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-12">
                            <label for="" class="text-xs font-bold px-1">Password</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-white text-lg"></i></div>
                                <input type="password" name="password" class="text-gray-500 rounded-lg border-none bg-white w-full -ml-10 pl-10 pr-3 py-2 outline-none" placeholder="************"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button class="block w-full max-w-xs mx-auto bg-red-800 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" type="submit">ADD NOW</button>
                        </div>
                    </div>

                </div>
                </form>
            </div>
            
        </div>

  )
}

export default addAdmin