function goAnalyzer() {

    document
        .getElementById("analyzer")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function analyze() {

    const text =
        document
            .getElementById("legalText")
            .value
            .trim();

    const task =
        document
            .getElementById("task")
            .value;

    const result =
        document
            .getElementById("result");


    if (text === "") {

        result.innerHTML =
            "<p>Please enter some legal text first.</p>";

        return;
    }


    result.innerHTML =
        "<p>🤖 Analyzing your document...</p>";


    setTimeout(function () {

        let output = "";


        /* SUMMARY */

        if (task === "summary") {

            const sentences =
                text.split(/[.!?]+/)
                .filter(sentence => sentence.trim() !== "");

            const summary =
                sentences
                .slice(0, 3)
                .join(". ");

            output = `
                <h3>📄 Document Summary</h3>

                <p>
                    ${escapeHTML(summary)}
                </p>

                <hr>

                <p>
                    <b>Total words:</b>
                    ${text.split(/\s+/).length}
                </p>
            `;
        }


        /* SIMPLE EXPLANATION */

        if (task === "explain") {

            output = `
                <h3>💡 Simple Explanation</h3>

                <p>
                    This legal text contains important
                    terms and obligations between the
                    parties involved.
                </p>

                <p>
                    In simple language, the main information
                    in the text is:
                </p>

                <p>
                    <b>
                    ${escapeHTML(text.substring(0, 500))}
                    </b>
                </p>

                <p>
                    ⚠️ For a real legal matter, ask a
                    qualified legal professional.
                </p>
            `;
        }


        /* CLAUSE DETECTION */

        if (task === "clauses") {

            const lowerText =
                text.toLowerCase();

            let clauses = [];


            if (
                lowerText.includes("payment") ||
                lowerText.includes("fee") ||
                lowerText.includes("invoice")
            ) {
                clauses.push("💰 Payment Clause");
            }


            if (
                lowerText.includes("termination") ||
                lowerText.includes("terminate")
            ) {
                clauses.push("🚫 Termination Clause");
            }


            if (
                lowerText.includes("confidential") ||
                lowerText.includes("confidentiality")
            ) {
                clauses.push("🔐 Confidentiality Clause");
            }


            if (
                lowerText.includes("liability") ||
                lowerText.includes("liable")
            ) {
                clauses.push("⚠️ Liability Clause");
            }


            if (
                lowerText.includes("notice")
            ) {
                clauses.push("📢 Notice Clause");
            }


            if (clauses.length === 0) {

                clauses.push(
                    "No common clauses detected."
                );
            }


            output = `
                <h3>🔍 Key Clauses</h3>

                <ul>
                    ${clauses
                        .map(item => `<li>${item}</li>`)
                        .join("")}
                </ul>

                <p>
                    This is keyword-based detection,
                    not a legal conclusion.
                </p>
            `;
        }


        /* QUESTIONS */

        if (task === "questions") {

            output = `
                <h3>❓ Questions to Ask a Lawyer</h3>

                <ul>

                    <li>
                        What are my responsibilities
                        under this document?
                    </li>

                    <li>
                        What happens if one party
                        breaks the agreement?
                    </li>

                    <li>
                        Are there any deadlines
                        I should know about?
                    </li>

                    <li>
                        Are there any penalties
                        mentioned?
                    </li>

                    <li>
                        Is there anything I should
                        clarify before signing?
                    </li>

                </ul>
            `;
        }


        result.innerHTML = output;

    }, 700);
}


function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}