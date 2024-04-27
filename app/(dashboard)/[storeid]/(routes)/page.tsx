import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesByCategory } from "@/actions/get-sales-by-category";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { GraphSales } from "@/components/graph-sales";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package, Coins } from "lucide-react";

interface DashboardPageProps{
    params: { 
        storeid: string 
    };
};



const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) =>{
    const totalRevenue = await getTotalRevenue(params.storeid);
    const salesCount = await getSalesCount(params.storeid);
    const stockCount = await getStockCount(params.storeid);
    const graphRevenue = await getGraphRevenue(params.storeid);
    const graphCategory = await getSalesByCategory(params.storeid);

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Your store overview" />
                <Separator />
                <div className="grid gap-4 grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Total revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                       <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                       </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                       <CardContent>
                        <div className="text-2xl font-bold">
                            +{salesCount}
                        </div>
                       </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                       <CardContent>
                        <div className="text-2xl font-bold">
                            {stockCount}
                        </div>
                       </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Average Order Revenue
                            </CardTitle>
                            <Coins className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                       <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue/salesCount)}
                        </div>
                       </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Per Month</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphRevenue} />
                    </CardContent>
                </Card>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Sales By Category</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <GraphSales data={graphCategory} />
                    </CardContent>
                </Card>
            </div>
           
        </div>
    );
}

export default DashboardPage;