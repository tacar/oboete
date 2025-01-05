import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Shield, Zap } from "lucide-react";

const services = [
  {
    title: "システム開発",
    description: "最新技術を活用した、スケーラブルなシステムを開発します。",
    icon: <Server className="h-12 w-12 text-primary" />,
  },
  {
    title: "セキュリティ対策",
    description: "強固なセキュリティで、お客様の大切な情報を守ります。",
    icon: <Shield className="h-12 w-12 text-primary" />,
  },
  {
    title: "技術コンサルティング",
    description: "豊富な経験を活かし、最適なソリューションを提案します。",
    icon: <Zap className="h-12 w-12 text-primary" />,
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary fade-in">
          サービス内容
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="fade-in">
              <CardHeader>
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-center">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;