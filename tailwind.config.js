/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            gr: "rgb(242, 243, 255)",
         },
         gridTemplateColumns: {
            "custom-2": "200px 1fr",
         },
      },
   },
   plugins: [],
};
