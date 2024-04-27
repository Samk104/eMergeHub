import prismadb from "@/lib/prismadb"

interface CategorySalesData {
    name: string;
    total: number;
  }
  
  export const getSalesByCategory = async (storeid: string): Promise<CategorySalesData[]> => {
    const paidOrders = await prismadb.order.findMany({
      where: {
        storeid,
        isPaid: true,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  
    const categorySales: { [key: string]: number } = {};
  
    for (const order of paidOrders) {
      for (const item of order.orderItems) {
        const categoryId = item.product.categoryId;
        categorySales[categoryId] = (categorySales[categoryId] || 0) + 1;
      }
    }
  
    const graphData: CategorySalesData[] = await prismadb.category.findMany({
      where: {
        storeid,
      },
      select: {
        name: true,
        id: true,
      },
    }).then((categories) =>
      categories.map((category) => ({
        name: category.name,
        total: categorySales[category.id] || 0,
      }))
    );
  
    return graphData;
  };