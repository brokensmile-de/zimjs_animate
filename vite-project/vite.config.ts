import { defineConfig } from "vite";
import { Plugin } from "rollup";

const preprocess: Plugin = {
    name: "AnimatePlugin",
    transform(code, id)  {
        if(id.endsWith("/Animate.js"))
        {

            code = "export default " + code.substring(1);
            code = code.substring(0,code.lastIndexOf(")("));
            console.log(code);
            // code = code.replace(/\)\(createjs = createjs\|\|{}, AdobeAn = AdobeAn\|\|{}\);\nvar createjs, AdobeAn;/, "");
            // this.emitFile({type: "asset", fileName: "test.js", source: code});
        }

        return { code, map: null };
    }
}

export default defineConfig({
    plugins: [
        {
            name: "AnimatePlugin",
            transform(code, id)  {
                if(id.endsWith("/Animate.js"))
                {
                    code = "export default " + code.substring(1);
                    code = code.substring(0,code.lastIndexOf(")("));
                }
        
                return { code, map: null };
            }
        }
    ]
})

