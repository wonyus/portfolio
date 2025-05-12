import AtIcon from "@/components/SVGs/AtIcon";
import GithubIcon from "@/components/SVGs/GithubIcon";
import LinkedInIcon from "@/components/SVGs/LinkedInIcon";
import LocationIcon from "@/components/SVGs/LocationIcon";
import PhoneIcon from "@/components/SVGs/PhoneIcon";
import Link from "next/link";

export default function Contact() {
    const contact = {
        email: "imronyusoh@outlook.com",
        phone: "+66 936807198",
        address: "Bangkok, Thailand",
    };

    const socialLinks = {
        github: "https://github.com/wonyus",
        linkedin: "https://linkedin.com/in/imronyusoh",
    };

    const first_block = (
        <div className="flex flex-col gap-2 p-4 w-1/2 border-1 border-gray-950/45 rounded-2xl outline-solid outline-red-200/5 text-shadow-lg shadow-lg">
            <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-row gap-2">
                    <AtIcon />
                    <h2 className="font-bold">Email</h2>
                </div>

                <p className="pl-6">{contact.email}</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-row gap-2">
                    <PhoneIcon />
                    <h2 className="font-bold">Phone</h2>
                </div>
                <p className="pl-6">{contact.phone}</p>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-row gap-2">
                    <LocationIcon />
                    <h2 className="font-bold">Address</h2>
                </div>
                <p className="pl-6">{contact.address}</p>
            </div>
        </div>
    );

    const second_block = (
        <div className="flex flex-col gap-2 p-4 w-1/2 border-1 border-gray-950/45 rounded-2xl outline-solid outline-red-200/5 text-shadow-lg shadow-lg">
            <h2 className="font-bold">Social Links</h2>
            <div className="flex flex-col gap-4 pt-7">
                <Link
                    href={socialLinks.github}
                    className="flex gap-3 content-baseline"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                >
                    <GithubIcon size={40} className="items-center" />
                    <div className="flex-row">
                        <p className="font-medium">Github</p>
                        <p>{"wonyus"}</p>
                    </div>
                </Link>
                <Link
                    href={socialLinks.linkedin}
                    className="flex gap-3 content-baseline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon size={40} className="items-center" />
                    <div className="flex-row">
                        <p className="font-medium">Linkedin</p>
                        <p>{"imronyusoh"}</p>
                    </div>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="container">
            {/* <h1 className="font-bold opacity-90 pb-4">Contact</h1> */}
            <div className="flex gap-4 w-full h-full pt-10">
                {first_block}
                {second_block}
            </div>
        </div>
    );
}
