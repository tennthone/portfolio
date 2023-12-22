import { Link } from '@inertiajs/react'
import React from 'react'

const Logo = () => {
  return (
    <>
        <div className="me-3">
            <Link href={route('admin.dashboard')} classname="flex ms-2 md:me-24">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    classname="h-8 me-3 "
                    alt="Tenthone Logo"
                />
            </Link>
        </div>
        <span classname="ms-5 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            Tenthone
        </span>
    </>
  )
}

export default Logo
