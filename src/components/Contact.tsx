import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "送信完了",
      description:
        "お問い合わせありがとうございます。担当者より連絡させていただきます。",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          お問い合わせ
        </h2>
        <div className="backdrop-blur-sm bg-background/60 rounded-xl p-6 border border-primary/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input placeholder="お名前" required className="text-sm" />
            </div>
            <div>
              <Input
                type="email"
                placeholder="メールアドレス"
                required
                className="text-sm"
              />
            </div>
            <div>
              <Textarea
                placeholder="お問い合わせ内容"
                className="min-h-[120px] text-sm"
                required
              />
            </div>
            <div className="text-center pt-2">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm transition-colors"
              >
                送信する
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
