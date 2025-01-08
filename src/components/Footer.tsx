import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.ComponentPropsWithoutRef<React.ElementType>  {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = React.forwardRef<HTMLDivElement, Props>((
  {
    ...props
  }, 
  forwardedRef
) => {
  return (
    <footer
      {...props}
      ref={forwardedRef}
      className={cn(
        "w-full max-w-[100dvw] h-fit px-6 py-4 bg-background overflow-clip",
        "flex flex-col justify-end items-center gap-2",
        props.className,
      )}
    >
      <div
        data-label="footer-sitemap"
        className={cn(
          "w-fit h-fit",
          "flex flex-row justify-start items-start gap-8 flex-wrap",
        )}
      >
        <div
          data-label="column"
          className="flex flex-col justify-start items-start gap-0"
        >
          <h3 className="font-bold text-base uppercase">WHO ARE WE?</h3>
          <Button variant="link" size="sm">Company</Button>
          <Button variant="link" size="sm">Community</Button>
          <Button variant="link" size="sm">Values</Button>
        </div>
        <div
          data-label="column"
          className="flex flex-col justify-start items-start gap-0"
        >
          <h3 className="font-bold text-base uppercase">SUPPORT</h3>
          <Button variant="link" size="sm">How to order</Button>
          <Button variant="link" size="sm">Refund policy</Button>
          <Button variant="link" size="sm">Order tracking</Button>
          <Button variant="link" size="sm">Size guide</Button>
          <Button variant="link" size="sm">Videos</Button>
          <Button variant="link" size="sm">FAQ</Button>
        </div>
        <div
          data-label="column"
          className="flex flex-col justify-start items-start gap-0"
        >
          <h3 className="font-bold text-base uppercase">PRODUCTS</h3>
          <Button variant="link" size="sm">Android App</Button>
          <Button variant="link" size="sm">IOS App</Button>
          <Button variant="link" size="sm">Desktop App</Button>
        </div>
      </div>

      <div
        className={cn(
          "w-full h-fit",
          "flex justify-between items-center gap-4 flex-wrap",
        )}
      >
        <div
          data-label="footer-useful-links"
          className={cn(
            "w-fit h-fit mt-4",
            "flex flex-row justify-start items-start gap-0 flex-wrap",
          )}
        >
          <Button variant="link" size="sm">
            Privacy
          </Button>
          <Button variant="link" size="sm">
            Terms and conditions
          </Button>
          <Button variant="link" size="sm">
            Copyright
          </Button>
          <Button variant="link" size="sm">
            Cookies Preferences
          </Button>
        </div>
        <div
          data-label="footer-socials"
          className={cn(
            "w-fit h-fit",
            "flex flex-row justify-start items-start gap-0",
          )}
        >
          <Button variant="ghost" size="sm" className="p-2">
            <FaTiktok />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <FaYoutube />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <FaInstagram />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <FaFacebook />
          </Button>
        </div>
      </div>
    </footer>
  )
});

Footer.displayName = "Footer";

export default Footer;