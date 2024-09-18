import { Children, ReactNode } from "react";

const Section = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-5">{children}</div>;
};

const Header = ({
  title,
  subTitle,
  type = "primary",
}: {
  title: string;
  subTitle?: string;
  type?: "primary" | "secondary";
}) => {
  return (
    <div className="border-b border-b-primary/30 pb-2 pt-14">
      {subTitle && (
        <span className="mb-2 block text-xs font-thin uppercase tracking-widest">
          {subTitle}
        </span>
      )}
      <div
        className={`text-2xl text-primary ${type === "primary" ? "!text-main" : "text-primary"}`}
      >
        {title}
      </div>
    </div>
  );
};

const Body = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="pb-5">
      <div className="pb-3 text-xl font-semibold text-primary">{title}</div>
      <div className="prose max-w-none text-primary/60 prose-p:mb-2 prose-p:mt-1 prose-strong:font-normal prose-strong:text-primary prose-code:rounded prose-code:bg-black/10 prose-code:px-1 prose-code:font-normal prose-code:text-primary prose-ul:my-2 prose-code:dark:bg-white/20">
        {children}
      </div>
    </div>
  );
};

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${Children.count(children)}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

const Divider = () => <div className="h-px w-full bg-primary/30"></div>;

Section.Body = Body;
Section.Divider = Divider;
Section.Table = Table;
Section.Header = Header;
export default Section;
