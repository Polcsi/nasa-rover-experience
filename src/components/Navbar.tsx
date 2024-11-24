import { Select, SelectItem } from "@nextui-org/select";
import i18n, { supportedLngs } from "@/i18n";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation("rover");

    const languages: { label: string; value: string }[] = supportedLngs.map(language => {
        return {
            label: language,
            value: language,
        };
    });

    return (
        <nav className="fixed top-0 left-0 z-10 w-screen h-16 flex justify-center items-center">
            <div className="section-content text-4 flex flex-row justify-between">
                <div>
                    <h1 className="poppins-extrabold tracking-widest uppercase text-xl">{t("curiosity-rover")}</h1>
                </div>
                <div className="relative">
                    <Select
                        variant="bordered"
                        defaultSelectedKeys={[i18n.language]}
                        className="w-20"
                        disallowEmptySelection
                        classNames={{
                            trigger: "text-4 !border-fourth focus-within:!border-blue-500",
                            base: "text-4",
                            mainWrapper: "border-fourth",
                            value: "!text-4 uppercase",
                        }}
                        onChange={event => {
                            console.log(event.target.value);
                            i18n.changeLanguage(event.target.value);
                        }}
                    >
                        {languages.map(language => {
                            return (
                                <SelectItem key={language.value} className="uppercase">
                                    {language.label}
                                </SelectItem>
                            );
                        })}
                    </Select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
