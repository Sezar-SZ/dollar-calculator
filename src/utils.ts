export function englishFarsiNumbers(str: string) {
    const farsiNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const farsi = str.replace(/[0-9]/g, function (match) {
        return farsiNumbers[parseInt(match)];
    });
    const english = [...str]
        .map((char) => {
            if (farsiNumbers.includes(char)) return farsiNumbers.indexOf(char);
            return char;
        })
        .map((char) => {
            if (arabicNumbers.includes(char.toString())) {
                return arabicNumbers.indexOf(char.toString());
            }
            return char;
        })
        .join("");

    return { farsi, english };
}
