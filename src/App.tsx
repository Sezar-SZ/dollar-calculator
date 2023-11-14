import { useEffect, useState } from "react";
import Header from "./components/header";
import * as cheerio from "cheerio";

import { englishFarsiNumbers } from "./utils";

interface Values {
    dollarPrice: string;
    dollarAmount: string;
    fee: string;
    tomanAmount: string;
}

function App() {
    const [values, setValues] = useState<Values>({
        dollarPrice: "",
        dollarAmount: "",
        fee: "5",
        tomanAmount: "",
    });

    useEffect(() => {
        fetch("http://87.107.104.78:5000").then((data) => {
            data.text().then((data) => {
                const $ = cheerio.load(data);
                const value = $("#usdmax").text();
                const dollarPrice = formatNumber(
                    removeCommas(
                        englishFarsiNumbers(value).english.slice(0, -1)
                    )
                );
                setValues({ ...values, dollarPrice });
            });
        });
    }, []);

    const feeValue = () => parseFloat(values.fee);

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
            <div className="w-full flex flex-col max-w-2xl mx-auto mt-[5vh] gap-7 px-3">
                {values.dollarPrice && (
                    <>
                        <div className="flex w-full justify-start">
                            <h1 className="text-2xl font-bold">
                                ابزار تبدیل دلار
                            </h1>
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
                                تومان
                            </div>
                            <div>
                                <label>کارمزد صرافی: </label>
                                <input
                                    type="text"
                                    className="px-2 py-1 border rounded w-[60px]"
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    value={values.fee}
                                    onChange={(e) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            fee: e.target.value,
                                        }))
                                    }
                                />{" "}
                                <span>%</span>
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
                                    <>
                                        <div className="flex gap-1 items-center justify-start mt-4">
                                            <span>بدون کارمزد: </span>
                                            <span>
                                                {(
                                                    parseInt(
                                                        removeCommas(
                                                            values.dollarAmount
                                                        )
                                                    ) *
                                                    parseInt(
                                                        removeCommas(
                                                            values.dollarPrice
                                                        )
                                                    )
                                                ).toLocaleString()}
                                            </span>
                                            <span>تومان</span>
                                        </div>
                                        {feeValue() !== 0 && (
                                            <div className="flex gap-1 items-center justify-start mt-4">
                                                <span>با کارمزد: </span>
                                                <span>
                                                    {(
                                                        parseInt(
                                                            removeCommas(
                                                                values.dollarAmount
                                                            )
                                                        ) *
                                                            parseInt(
                                                                removeCommas(
                                                                    values.dollarPrice
                                                                )
                                                            ) +
                                                        (feeValue() *
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
                                    </>
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
                                    <>
                                        <div className="flex gap-1 items-center justify-start mt-4">
                                            <span>بدون کارمزد: </span>
                                            <span>
                                                {Math.round(
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
                                                ).toLocaleString()}
                                            </span>
                                            <span>دلار</span>
                                        </div>
                                        {feeValue() !== 0 && (
                                            <div className="flex gap-1 items-center justify-start mt-4">
                                                <span>با کارمزد: </span>
                                                <span>
                                                    {(
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
                                                        ) +
                                                        (feeValue() *
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
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
