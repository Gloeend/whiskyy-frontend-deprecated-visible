import {FC, PropsWithChildren, ReactNode} from "react";
import {Link} from "react-router-dom";

interface IProfileTabProps extends PropsWithChildren {
    link: string;
    icon: ReactNode;
    large?: boolean;
    counter?: number;
}

export const ProfileTab: FC<IProfileTabProps> = ({children, link, icon, counter, large = false}) => (
    <>
        {
            large && typeof counter === "number" ?
                <Link to={link}
                      className="px-[1.5rem] flex flex-col py-[1.5rem] border-solid border-[1px] border-[var(--color-neutral-150)] rounded-[var(--radius-general)]">
                    <div className="flex justify-between w-[100%] mb-[150px]">
                        <span className="text-18px font-medium">{children}</span>
                        <span className="text-18px font-medium">{counter}</span>
                    </div>
                    <div className="mt-auto">
                        {
                            icon
                        }
                    </div>
                </Link> :
                <Link to={link}
                      className="px-[1.5rem] flex flex-col items-center justify-center py-[1.5rem] border-solid border-[1px] border-[var(--color-neutral-150)] rounded-[var(--radius-general)]">
                    {icon}
                    <span className="text-18px font-medium mt-[1.125rem]">{children}</span>
                </Link>
        }
    </>
)