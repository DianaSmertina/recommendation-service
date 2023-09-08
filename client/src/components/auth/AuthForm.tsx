import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ITokenResponse, IUser } from "../../types/types";
import UserApi from "../../api/UserApi";
import axios, { AxiosError, AxiosResponse } from "axios";

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
            localStorage.setItem("token", tokensData.data.accessToken);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const textError = axiosError.response.data as {message: string};
                    toast.error(`Error: ${textError.message}`);
                } else {
                    toast.error(`Network Error: ${error.message}`);
                }
            } else {
                toast.error(`Error: ${error}`);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <Form onSubmit={handleSubmit(onSubmit)}>
                {formType === "signUp" && (
                    <Form.Group className="mb-3">
                        <Form.Label>Your name:</Form.Label>
                        <Form.Control
                            placeholder="Name"
                            type="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name && (
                            <Form.Text>Please enter your name</Form.Text>
                        )}
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
                    {errors.email && <Form.Text>Please enter email</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        placeholder="Enter password"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    ></Form.Control>
                    {errors.password && (
                        <Form.Text>Please enter password</Form.Text>
                    )}
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    value="Submit"
                    className="mr-2"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default AuthForm;
