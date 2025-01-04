import Image from "next/image"


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            {/* LEFT */}
            <section className="bg-slate-400 p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
                <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">

                    {/* IMAGE */}

                    <div className="space-y-5 text-white">
                        <h1 className="h1">Manage your files</h1>
                        <p className="body-1">
                            This is the place where you can store all your documnents.
                        </p>
                    </div>

                    <Image src="/illustration.avif" width={342} height={342} alt="Files" className="transition-all hover:rotate-2 hover:scale-x-105" />
                </div>
            </section>


            {/* RIGHT */}
            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="">

                </div>
                
                {children}
            </section>
        </div>
    )
}

export default layout