import zim from "../../ts-src/typings/zim";

declare global {
    interface Window {
        exportRoot: {
            typi: zim.MovieClip,
        }
        zim: typeof zim;

        lib: any;

    }
}


