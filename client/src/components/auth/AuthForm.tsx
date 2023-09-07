import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import { IUser } from "../../types/types";
import { Api } from "../../api/api";

function AuthForm({ formType }: { formType: "signIn" | "signUp" }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IUser>({
        mode: "onSubmit",
    });

    const onSubmit: SubmitHandler<IUser> = async (formData) => {
        if (formType === "signIn") {
            console.log(await Api.signIn({
                email: formData.email,
                password: formData.password || "",
            }), document.cookie);
        }
    }

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
                    {errors.email && (
                        <Form.Text>Please enter email</Form.Text>
                    )}
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
