const BANK_COUNT = 4;
const MAX_RATING = 800;

export function getXML(creditScore: number) {
    const increment = MAX_RATING / BANK_COUNT;
    for (let i = 0; i < BANK_COUNT; i++) {
        if (creditScore > increment * i) {
            
        }
    }
}
