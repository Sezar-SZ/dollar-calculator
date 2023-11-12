import { useEffect, useState } from "react";
import Header from "./components/header";

interface Values {
    dollarPrice: string;
    dollarAmount: string;
    fee: number;
    tomanAmount: string;
}

function App() {
    const [values, setValues] = useState<Values>({
        dollarPrice: "50,000",
        dollarAmount: "",
        fee: 5,
        tomanAmount: "",
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: formatNumber(removeCommas(e.target.value)),
        });
    };

    const formatNumber = (str: string) => {
        if (!str) return "";
        str.toString().replaceAll(",", "");

        return parseInt(removeCommas(str.toString())).toLocaleString();
    };

    const removeCommas = (str: string) => {
        return str.replaceAll(",", "");
    };

    return (
        <div>
            <Header />
            <div className="w-full flex flex-col max-w-3xl mx-auto mt-[15vh] gap-7">
                <div className="flex w-full justify-start">
                    <h1 className="text-2xl font-bold">ابزار تبدیل دلار</h1>
                </div>
                <div className="flex w-full gap-5">
                    <div>
                        <label>قیمت دلار: </label>
                        <input
                            type="text"
                            className="px-2 py-1 border rounded"
                            name="dollarPrice"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={values.dollarPrice}
                            onChange={handleValueChange}
                        />
                    </div>
                    <div>
                        <label>کارمزد صرافی: </label>
                        <input
                            type="text"
                            className="px-2 py-1 border rounded w-20"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={values.fee}
                            onChange={(e) =>
                                setValues((prev) => ({
                                    ...prev,
                                    fee: +e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="flex w-full gap-5 items-end border-b pb-8 border-gray-200">
                    <div className="w-full flex flex-col">
                        <h2 className="text-lg py-2 font-bold">
                            تبدیل دلار به تومان
                        </h2>
                        <label>مبلغ به دلار</label>
                        <input
                            type="text"
                            className="px-2 py-1 border rounded"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={values.dollarAmount}
                            onChange={handleValueChange}
                            name="dollarAmount"
                        />
                        {values.dollarAmount && values.dollarPrice && (
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <span className="">
                                    {(
                                        parseInt(
                                            removeCommas(values.dollarAmount)
                                        ) *
                                            parseInt(
                                                removeCommas(values.dollarPrice)
                                            ) -
                                        (values.fee *
                                            (parseInt(
                                                removeCommas(
                                                    values.dollarAmount
                                                )
                                            ) *
                                                parseInt(
                                                    removeCommas(
                                                        values.dollarPrice
                                                    )
                                                ))) /
                                            100
                                    ).toLocaleString()}
                                </span>
                                <span>تومان</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex w-full gap-5 items-end">
                    <div className="w-full flex flex-col">
                        <h2 className="text-lg py-2 font-bold">
                            تبدیل تومان به دلار
                        </h2>
                        <label>مبلغ به تومان</label>
                        <input
                            type="text"
                            className="px-2 py-1 border rounded"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            value={values.tomanAmount}
                            onChange={handleValueChange}
                            name="tomanAmount"
                        />
                        {values.tomanAmount && values.dollarPrice && (
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <span>
                                    {(
                                        Math.round(
                                            parseInt(
                                                removeCommas(values.tomanAmount)
                                            ) /
                                                parseInt(
                                                    removeCommas(
                                                        values.dollarPrice
                                                    )
                                                )
                                        ) -
                                        (values.fee *
                                            Math.round(
                                                parseInt(
                                                    removeCommas(
                                                        values.tomanAmount
                                                    )
                                                ) /
                                                    parseInt(
                                                        removeCommas(
                                                            values.dollarPrice
                                                        )
                                                    )
                                            )) /
                                            100
                                    ).toLocaleString()}
                                </span>
                                <span>دلار</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
