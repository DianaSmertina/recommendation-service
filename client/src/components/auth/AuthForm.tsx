import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ITokenResponse, IUser } from "../../types/types";
import UserApi from "../../api/UserApi";
import { setUser } from "../../redux/userSlice";
import BlankField from "../errorsHelpers/BlankField";
import displayError from "../errorsHelpers/requestError";

import "react-toastify/dist/ReactToastify.css";

function AuthForm({ formType }: { formType: "signIn" | "signUp" }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IUser>({
        mode: "onSubmit",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<IUser> = async (formData) => {
        let tokensData: AxiosResponse<ITokenResponse>;
        try {
            if (formType === "signIn") {
                tokensData = await UserApi.signIn({
                    email: formData.email,
                    password: formData.password || "",
                });
            } else {
                tokensData = await UserApi.signUp({
                    email: formData.email,
                    password: formData.password || "",
                    name: formData.name || "",
                });
            }
            updateUserInfo(tokensData.data);
            navigate("/");
        } catch (error) {
            displayError(error as Error);
        }
    };

    const updateUserInfo = (data: ITokenResponse) => {
        localStorage.setItem("token", data.tokens.accessToken);
        const userData = data.userData;
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(
            setUser({
                id: userData.id,
                email: userData.email,
                isAdmin: userData.isAdmin,
            })
        );
    };

    return (
        <>
            <ToastContainer />
            <Form onSubmit={handleSubmit(onSubmit)}>
                {formType === "signUp" && (
                    <Form.Group className="mb-3">
                        <Form.Label>{t("your-name")}</Form.Label>
                        <Form.Control
                            placeholder={t("name")}
                            type="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && <BlankField />}
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        placeholder="example@gmail.com"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email && <BlankField />}
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>{t("password")}</Form.Label>
                    <Form.Control
                        placeholder={t("enter-password")}
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    ></Form.Control>
                    {errors.password && <BlankField />}
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    value="Submit"
                    className="mr-2"
                >
                    {t("submit")}
                </Button>
            </Form>
        </>
    );
}

export default AuthForm;
