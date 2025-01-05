import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 fade-in">
          私たちについて
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto fade-in">
          <p className="text-lg text-muted-foreground mb-6">
            私たちは、最新のテクノロジーと革新的なアイデアで、
            お客様のビジネスの成長をサポートする IT
            ソリューションカンパニーです。
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            2024年の設立以来、多くの企業様のデジタルトランスフォーメーションを
            支援してきました。
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            私たちの使命は、テクノロジーの力で企業の可能性を最大限に引き出し、
            持続可能な成長を実現することです。
          </p>
        </div>
        <div className="text-center mt-12">
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              お問い合わせ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;