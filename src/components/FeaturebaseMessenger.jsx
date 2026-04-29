"use client";

import { useEffect, useRef } from "react";

const FeaturebaseMessenger = () => {
    const loadedRef = useRef(false);

    useEffect(() => {
        const bootFeaturebase = async () => {
            const win = window;

            if (typeof win.Featurebase !== "function") {
                win.Featurebase = function () {
                    (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
                };
            }

            const userData = localStorage.getItem("user");

            // Generate user hash for secure authentication
            const generateUserHash = async (userId, email) => {
                const CryptoJS = (await import("crypto-js")).default;
                const secretKey = process.env.NEXT_PUBLIC_FEATUREBASE_SECRET || "your-featurebase-secret-key";
                const userIdentifier = userId || email;
                const hash = CryptoJS.HmacSHA256(userIdentifier, secretKey).toString();
                return hash;
            };

            if (userData) {
                const user = JSON.parse(userData);
                const generatedToken = await generateUserHash(user.id || user._id, user.email);

                win.Featurebase("boot", {
                    appId: "68bfc0889bbea48acef4dd7b",
                    email: user.email,
                    userId: user.id || user._id,
                    createdAt: user?.createdAt,
                    theme: "light",
                    language: "en",
                    name: user.name,
                    userHash: generatedToken,
                });
            } else {
                win.Featurebase("boot", {
                    appId: "68bfc0889bbea48acef4dd7b",
                    createdAt: Date.now(),
                    theme: "light",
                    language: "en",
                });
            }
        };

        const loadFeaturebase = () => {
            if (loadedRef.current) return;
            loadedRef.current = true;

            // Remove all trigger listeners once we start loading
            cleanup();

            const script = document.createElement("script");
            script.src = "https://do.featurebase.app/js/sdk.js";
            script.async = true;
            script.id = "featurebase-sdk";
            script.onload = () => {
                bootFeaturebase();
            };
            document.head.appendChild(script);
        };

        // Set up interaction-based triggers
        const events = ["scroll", "click", "touchstart"];
        const listenerOptions = { once: true, passive: true };

        events.forEach((event) => {
            window.addEventListener(event, loadFeaturebase, listenerOptions);
        });

        // Fallback: load after 10 seconds regardless
        const fallbackTimer = setTimeout(loadFeaturebase, 10000);

        // Cleanup function to remove all listeners and timer
        const cleanup = () => {
            events.forEach((event) => {
                window.removeEventListener(event, loadFeaturebase, listenerOptions);
            });
            clearTimeout(fallbackTimer);
        };

        // Return cleanup for useEffect unmount
        return cleanup;
    }, []);

    return null;
};

export default FeaturebaseMessenger;
