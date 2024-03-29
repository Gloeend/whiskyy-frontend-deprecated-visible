import {Input} from "src/features/input";
import {Button} from "src/features/button";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useAuth} from "@entities/auth_provider";
import {useFormik} from "formik";
import * as Yup from "yup";
import {IRegistration} from "@pages/auth/model";
import {SelectWithSearch} from "src/features/select_with_search";
import {useAuthApi} from "@pages/auth/api";

const countries = [
    "Russia",
    "France",
    "Germany",
    "Czech Republic",
    "Austria",
    "Netherlands",
    "Belgium"
]

const objectSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required field').email("Invalid email"),
    name: Yup.string().required("First name is required field"),
    country: Yup.string().required("Country is required field"),
    address_main: Yup.string().required("Address 1 is required field"),
    city: Yup.string().required("City is required field"),
    address_secondary: Yup.string(),
    postcode: Yup.number().required("Postcode is required field"),
    last_name: Yup.string().required("Last name is required field"),
    password: Yup.string()
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, "Please create a stronger password")
        .required("Password is required field"),
    password_repeat: Yup.string()
        .required("Password confirmation required")
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),

})

interface IRegistrationForm extends IRegistration {
    password_repeat: string;
}

const initialValues: IRegistrationForm = {
    email: "",
    name: "",
    last_name: "",
    country: "",
    city: "",
    address_main: "",
    address_secondary: "",
    postcode: "",
    password: "",
    password_repeat: ""

}
export const Registration = () => {
    const [_, setCookie] = useCookies(["user", "token"]);
    const navigate = useNavigate();
    const {registration} = useAuthApi();
    const {setUser, setToken} = useAuth();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: objectSchema,
        onSubmit: async (values) => {
            try {
                const {user, token} = await registration(values);

                setUser(user);
                setToken(token);
                setCookie("user", user, {
                    path: "/"
                });
                setCookie("token", token, {
                    path: "/"
                });
                navigate("/auth/login");
            } catch (error) {
                // @ts-ignore
                if (error.response.data.email) formik.setStatus(error.response.data.email[0])
            }
        },
    })

    return (
        <>
            <section className="wrap innerShadow py-[4rem] bg-[var(--color-neutral-100)]">
                <div>
                    <div className="flex flex-col justify-between gap-[var(--variable-22px)]">
                        <h1 className="text-[3rem] font-medium text-[var(--color-neutral-900)]">Account creation</h1>
                        <p className="text-[1rem] text-[var(--color-neutral-400)]">Create an account to get full
                            Whiskyyy functionality</p>
                    </div>
                </div>
            </section>
            <section className="wrap mt-[2rem]">
                <p className="text-[var(--variable-20px)] font-medium">Fill in all required fields</p>
                {formik.status ? (
                    <div className='fv-help-block'>
                        <span role='alert'>{formik.status}</span>
                    </div>
                ) : (
                    <></>
                )}
                <form
                    onSubmit={formik.handleSubmit}
                    id='kt_login_signin_form'
                    className="w-[65%] grid grid-cols-2 gap-[.5rem_1rem] mt-[var(--variable-24px)]"
                >
                    <div>
                        <span className="text-[var(--color-neutral-400)]">Account details</span>
                        <fieldset className="pb-[1.125rem] relative mt-[1rem]">
                            <Input
                                placeholder="Email Address*"
                                {...formik.getFieldProps('email')}
                            ></Input>
                            {formik.touched.email && formik.errors.email && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.email}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="First Name*"
                                {...formik.getFieldProps('name')}
                            ></Input>
                            {formik.touched.name && formik.errors.name && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.name}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Last Name*"
                                {...formik.getFieldProps('last_name')}
                            ></Input>
                            {formik.touched.last_name && formik.errors.last_name && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.last_name}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Password*"
                                type="password"
                                {...formik.getFieldProps('password')}
                            ></Input>
                            {formik.touched.password && formik.errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.password}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Confirm Password*"
                                type="password"
                                {...formik.getFieldProps('password_repeat')}
                            ></Input>
                            {formik.touched.password_repeat && formik.errors.password_repeat && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.password_repeat}</span>
                                    </div>
                                </div>
                            )}
                            {
                                <>
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.password_repeat}</span>
                                        </div>
                                    </div>
                                </>
                            }
                        </fieldset>
                        <div className="flex items-center pr-[4rem] mt-[1rem]">
                            <Button className="flex-grow" type="submit">Login</Button>
                            <Link
                                className="block flex-grow whitespace-nowrap py-[var(--variable-20px)] px-[var(--variable-28px)]"
                                to="">Forgotten password?</Link>

                        </div>
                    </div>
                    <div>

                        <span className="text-[var(--color-neutral-400)]">Shipping details</span>
                        <fieldset className="pb-[1.125rem] relative mt-[1rem]">
                            <SelectWithSearch onChange={(newValue) => {
                                formik.setFieldTouched("country");
                                formik.setFieldValue("country", newValue);
                            }} placeholder="Select Country*" items={countries}
                            ></SelectWithSearch>
                            {formik.touched.country && formik.errors.country && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.country}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="City*"
                                {...formik.getFieldProps('city')}
                            ></Input>
                            {formik.touched.city && formik.errors.city && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.city}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Address 1*"
                                {...formik.getFieldProps('address_main')}
                            ></Input>
                            {formik.touched.address_main && formik.errors.address_main && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.address_main}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Address 2"
                                {...formik.getFieldProps('address_secondary')}
                            ></Input>
                            {formik.touched.address_secondary && formik.errors.address_secondary && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.address_secondary}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <fieldset className="pb-[1.125rem] relative mt-[.5rem]">
                            <Input
                                placeholder="Postcode*"
                                {...formik.getFieldProps('postcode')}
                            ></Input>
                            {formik.touched.postcode && formik.errors.postcode && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.postcode}</span>
                                    </div>
                                </div>
                            )}
                        </fieldset>
                    </div>
                </form>
            </section>
        </>
    )
}