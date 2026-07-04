import argparse
import json
import httpx
import sys

def run_evaluation(api_url, token):
    try:
        with open("evaluation/prompts/dental_prompts.json", "r") as f:
            prompts = json.load(f)
    except Exception as e:
        print(f"Error loading prompts: {e}")
        sys.exit(1)

    results = []
    passed_count = 0

    print(f"{'ID':<8} | {'Status':<6} | {'Keywords Found':<20} | Question")
    print("-" * 80)

    for prompt in prompts:
        question = prompt["question"]
        expected = [k.lower() for k in prompt["expected_keywords"]]
        min_required = prompt["min_keywords_required"]

        headers = {"Authorization": f"Bearer {token}"} if token else {}
        try:
            res = httpx.post(f"{api_url}/api/v1/rag/ask", json={"question": question, "top_k": 3}, headers=headers, timeout=30.0)
            res.raise_for_status()
            data = res.json()
            answer = data.get("answer", "").lower()

            found = [k for k in expected if k in answer]
            passed = len(found) >= min_required

            results.append({
                "id": prompt["id"],
                "question": question,
                "expected": expected,
                "found": found,
                "passed": passed,
                "answer": data.get("answer", "")
            })

            if passed:
                passed_count += 1
                status = "PASS"
            else:
                status = "FAIL"

            found_str = ", ".join(found) if found else "None"
            print(f"{prompt['id']:<8} | {status:<6} | {found_str[:20]:<20} | {question[:40]}")

        except Exception as e:
            print(f"{prompt['id']:<8} | {'ERROR':<6} | {'N/A':<20} | {e}")

    total = len(prompts)
    score = (passed_count / total) * 100 if total > 0 else 0

    print("-" * 80)
    print(f"Total: {total} | Passed: {passed_count} | Score: {score:.1f}%")

    report = {
        "summary": {
            "total_tests": total,
            "passed": passed_count,
            "score_percentage": score
        },
        "details": results
    }

    with open("evaluation/results/eval_report.json", "w") as f:
        json.dump(report, f, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-url", default="http://localhost:8000")
    parser.add_argument("--token", default="")
    args = parser.parse_args()
    
    run_evaluation(args.api_url, args.token)
