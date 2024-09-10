import React from "react";
import { User } from "@supabase/supabase-js";
import Log from "@/components/log";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PartHeaderProfile({ user }: { user: User }) {
    return (
        <div>
            {user.email}
            <Button asChild>
                <Link href="/logout">Logout</Link>
            </Button>
            <Log log={user} />
        </div>
    );
}

export default PartHeaderProfile;
