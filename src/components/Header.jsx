import { Menu, Star, Gem } from "lucide-react";
import XPBar from "./XPBar";
import styles from "./Header.module.css";

export default function Header({ plan = "free" }){
        return (
                <header className= {styles.header}>
                    <div className= {styles.left}>
                        <div className = {styles.logo}>M</div>
                        <span className= {styles.title}>Minerva</span> 
                            {plan === "pro" &&(
                                <span className = {styles.planBadge}>
                                <Star size = {12} /> Student Pro
                                </span>
                            )}
                            {plan === "elite" &&(
                                <span className= {`${styles.planBadge} ${styles.planBadgeElite}`}>
                                <Gem size = {12} /> Student Elite
                                </span>
                            )}
                    </div>
                    <div className= {styles.right}>
                        <XPBar level={3} xp={420} xpForNext={500} />
                        <button className= {styles.menuBtn} aria-label= "Menu">
                            <Menu size = {20} />
                        </button>
                    </div>
                </header>
        );
}