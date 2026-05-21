export const ProductDetail = () =>{
    const pieces = Array.from({length: 99},(_,i) => i +1)

    const dummyReviews =[
        {
            id:1,
            user:"user01",
            evaluation:5,
            description:"レビュー！！！！"
        },
        {
            id:2,
            user:"user02",
            evaluation:5,
            description:"レビュー！！！！"
        },
        {
            id:3,
            user:"user03",
            evaluation:5,
            description:"レビュー！！！！"
        },
    ];

    return (
        <main>
            <section className="flex flex-col md:flex-row justify-between px-4 xl:px-11 py-10">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-row md:flex-col gap-3 md:pr-4.5 pb-3">
                        <div className="w-12 h-12 bg-[#F2F1F1]"></div>
                        <div className="w-12 h-12 bg-[#F2F1F1]"></div>
                        <div className="w-12 h-12 bg-[#F2F1F1]"></div>
                        <div className="w-12 h-12 bg-[#F2F1F1]"></div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full h-100 md:w-100 md:h-100 bg-[#F2F1F1]"></div>
                        <div className="md:pl-9 py-3">
                            <p className="text-4xl">product title</p>
                            <p className="font-bold text-2xl hidden md:block">¥<span className="pl-1.5 text-[#FF6A33]">2000</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-50 justify-center">
                    <p className="font-bold text-4xl">¥<span className="pl-1.5 text-[#FF6A33]">2000</span></p>
                    <div className="pb-2.5 ">
                        <label htmlFor="pieces">個数を選択</label>
                        <select name="pieces" id="pieces" className="w-full py-2.5 border border-[#BBB7B7]">
                            {pieces.map((num) =>{
                                return(
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="w-full py-2.5 text-white bg-[#FF6A33]">購入する</button>
                    <button className="w-full py-2.5 bg-[#F2F1F1]">カートに追加</button>
                </div>
            </section>

            <section className="px-4 xl:px-11 py-10">
                <div className="pb-8 flex gap-2">
                    <div className="bg-[#FF6A33] w-1 h-auto"></div>
                    <p className="text-3xl">レビュー</p>
                </div>
                <hr className="border border-[#BBB7B7]" /> 
                {dummyReviews.map((review) =>{
                    return (
                        <div key={review.id}>
                            <div className="py-4">
                                <p>{review.user}</p>
                                <p className="text-yellow-400 pr-1.5">★★★★★</p>
                                <p>{review.description}</p>
                            </div>
                                <hr className="border-b border-[#BBB7B7]"></hr>
                        </div>
                    );
                })}
            </section>
        </main>
    );
}

export default ProductDetail;