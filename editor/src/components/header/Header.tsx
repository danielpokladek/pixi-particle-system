import { EmitterControls } from "./EmitterControls";
import { SocialLinks } from "./SocialLinks";

/**
 *  Header component.
 */
export default function Header(): JSX.Element {
    return (
        <>
            <header className="header">
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <EmitterControls />
                    <SocialLinks />
                </nav>
            </header>
        </>
    );
}
