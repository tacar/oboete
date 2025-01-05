import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 fade-in">
          次世代のITソリューションを
          <br />
          あなたのビジネスへ
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto fade-in">
          最新のテクノロジーと豊富な経験で、
          お客様のビジネスの成長をサポートします。
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg fade-in"
        >
          無料相談はこちら
        </Button>
      </div>
    </div>
  );
};

export default Hero;