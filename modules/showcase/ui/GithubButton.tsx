import { Button } from "@/modules/ui/Button";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function GithubButton() {
    function onClick() {
        window.open("https://github.com/kuraykaraaslan/next_js_components", "_blank");
    }

    return (
        <Button variant="outline" size="sm" onClick={onClick} iconLeft={<FontAwesomeIcon icon={faGithub} />}>
        </Button>
    );
}