import {Outlet} from "react-router-dom";
function AuthLayout() {
    return (
        <>
            <div className={"min-h-screen 2xl:overflow-hidden flex justify-center relative z-10"}>
                <main
                    className={"container grid gap-10 justify-items-center md:grid-cols-2 items-center p-5 md:justify-items-stretch"}>
                    <Outlet/>
                </main>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={"absolute bottom-0"}>
                <path fill={'var(--color-secundario)'} fillOpacity="1"
                      d="M0,192L120,208C240,224,480,256,720,266.7C960,277,1200,267,1320,261.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
        </>
    );
}

export default AuthLayout;