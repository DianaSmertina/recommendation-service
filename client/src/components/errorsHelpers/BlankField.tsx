import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function BlankField() {
    const { t } = useTranslation();
    return <Form.Text>{t("filled-error")}</Form.Text>
}

export default BlankField;