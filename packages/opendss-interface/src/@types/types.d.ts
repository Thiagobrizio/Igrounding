declare module "winax" {
    interface WinaxOptions {
        activate: boolean;
        getobject: boolean;
        type: boolean;
    }
    class Object extends OpenDSSengine.DSS {
        constructor(value: "OpenDSSengine.DSS", options?: WinaxOptions);
    }
}
