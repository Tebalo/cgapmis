import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Authentication'
}

export default function AuthenticationPage() {
    return(
        <>
            <div className="md:hidden">
                <Image
                    src={'/auth/auth-light.png'}
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src={'/auth/auth-dark.png'}
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href={'/login'}
                    className={cn(
                        
                    )}
                >
                    Login
                </Link>
            </div>
        </>
    );
}