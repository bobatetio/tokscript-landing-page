"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";
import { FaChevronDown } from "@/components/Icons";
import { languages } from "@/data/languages";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Detect current language from URL
  const pathSegment = pathname.split("/")[1];
  const currentLang = languages.find(l => l.slug === pathSegment) || languages[0]; // default English

  // Build dropdown items: exclude current, put English first if on non-English page
  const otherLangs = languages.filter(l => l.code !== currentLang.code);

  const label = currentLang.code === "en" ? "Language" : currentLang.nativeName;

  return (
    <li
      className="language-dropdown-wrapper"
      onMouseEnter={() => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
      }}
    >
      <Dropdown className="language-dropdown" show={open}>
        <Dropdown.Toggle as="button" className="language-toggle" onClick={() => setOpen(prev => !prev)}>
          {label}
          <FaChevronDown size={10} className="chevron-icon" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="language-menu">
          {otherLangs.map((lang) => (
            <Dropdown.Item
              key={lang.code}
              as={Link}
              href={lang.slug === "/" ? "/" : `/${lang.slug}`}
              className="language-item"
              onClick={() => setOpen(false)}
            >
              <span className="lang-native">{lang.nativeName}</span>
              <span className="lang-english">{lang.name}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
