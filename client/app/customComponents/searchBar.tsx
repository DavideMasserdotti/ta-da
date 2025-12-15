import {
    Navbar,
    NavbarContent,
    Input,
} from "@heroui/react";




export default function SearchBar({ onChange }: { onChange: (term: string) => void }) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Navbar isBordered>
            <NavbarContent as="div" className="items-center" justify="end">
                <Input
                    classNames={{
                        base: "max-w-500 h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper:
                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Cerca task..."
                    size="sm"
                    startContent={<p>🔍</p>}
                    type="search"
                    onChange={handleInputChange}
                />
            </NavbarContent>
        </Navbar>
    );
}
