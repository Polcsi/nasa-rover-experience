import Key from "@keyboard/Key";

const KeyboardControls = () => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-2">
                <Key key="w" control="forward" button="w" className="self-center" />
                <div className="flex flex-row gap-2">
                    <Key key="a" control="left" button="a" />
                    <Key key="s" control="backward" button="s" />
                    <Key key="d" control="right" button="d" />
                </div>
            </div>
        </div>
    );
};

export default KeyboardControls;
