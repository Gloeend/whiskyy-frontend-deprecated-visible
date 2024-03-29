// import c from "./style.module.scss";

import {Button} from "src/features/button";
import {Link} from "react-router-dom";
import {Input} from "src/features/input";
import {IcOutlineEmail, PasswordOutline} from "src/shared/icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ILogin} from "@pages/auth/model";
import {useAuth} from "@entities/auth_provider";
import {useCookies} from "react-cookie";
import {useAuthApi} from "@pages/auth/api";

const objectSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email required to fill').email("Invalid email"),
    password: Yup.string()
        .required("Password required to fill")

})
const initialValues: ILogin = {
    email: "",
    password: ""
}
export const Login = () => {
    const [_, setCookie] = useCookies(["user", "token"]);
    const {login} = useAuthApi();
    const {setUser, setToken} = useAuth();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: objectSchema,
        onSubmit: async (values) => {
            try {
                const {user, token} = await login(values);
                setUser(user);
                setToken(token);
                setCookie("user", user, {
                    path: "/"
                });
                setCookie("token", token, {
                    path: "/"
                });
            } catch (error) {
                console.log(error)
                formik.setStatus("Invalid email or password")
            }
        },
    })

    return (
        <>
            <section className="wrap innerShadow py-[4rem] bg-[var(--color-neutral-100)]">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col justify-between gap-[var(--variable-22px)]">
                        <h1 className="text-[3rem] font-medium text-[var(--color-neutral-900)]">Authorization</h1>
                        <p className="text-[1rem] text-[var(--color-neutral-400)]">Log in to an existing Wineee account
                            or create a new one</p>
                    </div>
                    <div className="flex flex-col justify-between gap-[var(--variable-22px)]">
                        <p className="text-[var(--color-neutral-400)] text-[1rem] text-right">
                            Whiskyyyy is a constantly evolving auction site. We are trying to improve the interaction
                            between those who buy and those who buy
                        </p>
                        <a href="mailto:contact@whiskyyy.com"
                           className="block text-[var(--color-primary)] text-[1rem] text-right">contact@whiskyyy.com</a>
                    </div>
                </div>
            </section>
            <section className="wrap mt-[2rem]">
                <div className="grid grid-cols-[45%_1fr]">
                    <form
                        onSubmit={formik.handleSubmit}
                        id='kt_login_signin_form'
                        className="border-solid border-[transparent] pr-[4rem] border-r-[1px] border-r-[var(--color-neutral-200)]"
                    >

                        <p className="text-[var(--variable-20px)] font-medium">If you already have an account</p>
                        {formik.status ? (
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.status}</span>
                            </div>
                        ) : (
                            <></>
                        )}
                        <fieldset className="mt-[var(--variable-24px)]">
                            <Input.InputWithIcon
                                icon={<IcOutlineEmail></IcOutlineEmail>}
                                placeholder="Email Address*"
                                {...formik.getFieldProps('email')}
                            ></Input.InputWithIcon>
                            {formik.touched.email && formik.errors.email && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.email}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="mt-[.5rem]">
                            <Input.InputWithIcon
                                icon={<PasswordOutline></PasswordOutline>}
                                placeholder="Password*"
                                type="password"
                                {...formik.getFieldProps('password')}
                            ></Input.InputWithIcon>
                            {formik.touched.password && formik.errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.password}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <div className="flex items-center pr-[4rem] mt-[1rem]">
                            <Button className="flex-grow" type="submit">Login</Button>
                            <Link
                                className="block flex-grow whitespace-nowrap py-[var(--variable-20px)] px-[var(--variable-28px)]"
                                to="">Forgotten password?</Link>
                        </div>
                    </form>
                    <div className="pl-[4rem]">
                        <p className="text-[var(--variable-20px)] font-medium">If you don't have an account yet</p>
                        <Link to="/auth/registration" className="block w-fit mt-[var(--variable-24px)] mb-[3rem]">
                            <Button>Create Account</Button>
                        </Link>
                        {/*<p className="text-[var(--color-neutral-400)]">What you will be able to do after creating an account:</p>*/}
                    </div>
                </div>
            </section>
        </>
    )
}