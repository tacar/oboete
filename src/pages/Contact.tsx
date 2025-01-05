import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

const Contact = () => {
  const handleTwitterClick = () => {
    window.open("https://twitter.com/tacarzen", "_blank");
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          お問い合わせ
        </h2>
        <div className="backdrop-blur-sm bg-background/60 rounded-xl p-8 border border-primary/10 text-center space-y-6">
          <p className="text-lg text-muted-foreground">
            本サービスに関するお問い合わせは、
            <br />
            Twitter（X）のDMにてお願いいたします。
          </p>
          <div className="contact-container">
            <div className="contact-content">
              <Button
                onClick={handleTwitterClick}
                className="twitter-button bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
              >
                <Twitter className="twitter-icon" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/80">
            ご要望やご感想もお待ちしております。
          </p>
          <p className="text-xs text-muted-foreground/60">
            ※ 本サービスは予告なく終了する場合がございます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
