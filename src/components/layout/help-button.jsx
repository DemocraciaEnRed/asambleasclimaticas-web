"use client";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HelpButton() {
  const pathname = usePathname();
  if (!pathname.includes("sobre")) {
    return (
      <div class="help-button-wrapper is-right is-hoverable dropdown is-up ">
        <div class="dropdown-trigger">
          <button
            class="button is-rounded is-primary p-5 is-size-5"
            aria-haspopup="true"
            aria-controls="dropdown-menu7"
          >
            <FontAwesomeIcon icon={faQuestion} />
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu7" role="menu">
          <div class="dropdown-content">
            <Link
              href="/sobre"
              class="button is-uppercase has-text-centered is-primary is-rounded my-3 has-text-weight-bold dropdown-item"
            >
              Sobre resurgentes
            </Link>
            <Link
              href="/sobre/como-participar"
              class="button is-uppercase has-text-centered is-primary is-rounded my-3 has-text-weight-bold dropdown-item"
            >
              ¿Como participar?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
