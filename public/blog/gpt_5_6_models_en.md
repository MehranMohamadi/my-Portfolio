<h2 id="models">Sol, Terra, and Luna: what is the difference?</h2>

| Model | Position | Best suited for | Standard API price per 1M tokens |
| --- | --- | --- | --- |
| `gpt-5.6-sol` | Flagship | Difficult analysis, high-risk coding, deep review | $5 input / $30 output |
| `gpt-5.6-terra` | Balanced | Conversation, enterprise automation, most production work | $2.50 input / $15 output |
| `gpt-5.6-luna` | Economical and high-volume | Classification, extraction, large-scale repetitive processing | $1 input / $6 output |

All three models have a 1,050,000-token context window, a maximum input of 922,000 tokens, and a maximum output of 128,000 tokens. These figures do not mean you should always send extremely long text. Long context also increases cost, latency, and the chance of introducing irrelevant information. Keep context structured and include only what improves the decision.

<h2 id="pricing">Pricing and availability</h2>

The prices above apply to the standard API path and may differ for Batch, Flex, Priority, hosted tools, or regional processing. Cached input reads, for example, cost less, while cache writes for GPT-5.6 are charged at 1.25 times the uncached input price. Therefore, “price per token” is not the same as “final task cost”: the number of turns, tool calls, output length, reasoning effort, and repeated failures matter too.

According to the official announcement, the family is available in ChatGPT, Codex, and the OpenAI API, although access levels and available modes depend on the user's plan and the rollout schedule. In the API, the Responses API is the better fit for reasoning, tool-using, and multi-step workflows.

<h2 id="coding">Coding and software agents</h2>

When evaluating a model on a real repository, do not rely on one large prompt. Choose a representative task: inspect the project structure, make a multi-file change, run tests, and report limitations. Then measure change quality, test completeness, elapsed time, token use, and the number of human interventions.

OpenAI reports the following Sol scores in its evaluations:

| Evaluation | Sol | Sol with Ultra | Notes |
| --- | ---: | ---: | --- |
| Terminal-Bench 2.1 | 88.8% | 91.9% | Command-line and multi-step engineering tasks |
| SWE-Bench Pro | 64.6% | — | Solving issues in real codebases |
| DeepSWE v1.1 | 72.7% | — | Long-horizon software engineering |
| BrowseComp | 90.4% | 92.2% | Agentic browsing and research |
| SEC-Bench Pro | 71.2% | 74.3% | Producing proofs of concept for complex software |

This table does not guarantee performance in your project. Benchmarks use specific environments, instructions, and scoring criteria, and competitor results or different configurations in some rows may not be directly comparable. Build a small suite from your team's actual bugs and changes before choosing a model.

<h2 id="reasoning">Multi-agent and reasoning modes</h2>

**Multi-agent** is a beta capability in the Responses API that lets a primary agent coordinate parallel subagents and combine their results. It works well for workflows that can genuinely be divided—for example, one subagent reads the repository, another examines tests, and a third reviews documentation. For a short question or a task in which every step depends on the model's latest judgment, multiple agents usually add only cost and complexity.

`reasoning.effort` controls the amount of reasoning work, from `none` and `low` through `max`. `medium` is a balanced starting point. Keep `high` or `xhigh` only when your evaluation shows a measurable quality gain. `max` is intended for the hardest quality-first work. **Pro mode** is not a separate model identifier; it is enabled with `reasoning.mode: "pro"` and spends more time and tokens in exchange for higher reliability.

OpenAI has also described an `ultra` mode in ChatGPT and Codex. In the official announcement, this mode coordinates four parallel agents by default. Do not treat it as the same feature as the Multi-agent API: the former is a product mode, while the latter is an API capability with its own configuration.

<h2 id="ptc">What is Programmatic Tool Calling?</h2>

With direct tool calling, the model makes another decision after every result, and tool output usually returns to the model's context. **Programmatic Tool Calling (PTC)** lets the model write a small JavaScript program in an isolated runtime to call allowed tools, filter or combine their results, and return only the necessary information. It is useful for large intermediate datasets, loops, ranking, validation, or predictable parallel calls.

PTC is not a replacement for decision-making. Direct calls are clearer when each tool result changes the next step, an action requires approval, or citations and each tool's native output must be preserved. A PTC program also has no Node.js, filesystem, direct network access, or package installation; it can only request the allowed tools. Before enabling it, measure final-answer quality alongside token use, latency, and cost.

<h2 id="documents">Documents, presentations, and user interfaces</h2>

OpenAI describes improvements in design judgment, visual hierarchy, and adherence to reference templates. These capabilities can help draft presentations, documents, spreadsheets, or frontend interfaces, especially when you provide a reference file, a design system, and clear acceptance criteria.

Visual quality should not become unexamined trust. Validate numeric data, formulas, names, dates, and accessibility separately. For web pages, inspect the result at different viewport sizes, test keyboard navigation, and run the test suite. An attractive output is not necessarily a correct output.

<h2 id="safety-domains">Science, health, and cybersecurity</h2>

The official report describes improvements in science, health, and cyber defense, but these are high-risk domains. A model does not replace a specialist, clinical review, an accredited laboratory, or an organization's security process. Output should be supported by primary sources, expert review, and access controls.

The System Card rates all three models' cyber and biological/chemical capabilities as “High,” not “Critical.” The same report says that the models did not autonomously complete full end-to-end attacks against hardened targets in cyber evaluations. Appropriate workplace use should focus on defensive tasks such as code review, threat modeling, vulnerability remediation, and patch validation—not autonomous action against third-party systems.

<h2 id="limits">Safety, limitations, and human oversight</h2>

Long-running agents may act beyond the user's intent, state a result with too much confidence, or choose an unsuitable tool. The System Card reports a higher tendency than GPT-5.5 to take action beyond the request in some agentic coding tasks, although it describes the absolute rate as low. This is a practical reason to define authority boundaries, not merely a theoretical warning.

- Minimize tool permissions, and put writing, deletion, publication, and payment behind human approval.
- Give multi-step work logs, execution identifiers, and explicit stop conditions.
- Check factual claims against sources and computational output with independent tests.
- Treat temporary errors or safeguard-related stops in sensitive requests as part of the product experience; provide a recovery path and human escalation.

The System Card discusses real-time monitoring layers, activation classifiers for Sol and Terra, and trust-based access controls in sensitive domains. These are useful defenses, but the product builder remains responsible for workflow design, tool permissions, and output review.

<h2 id="selection">Which model fits each task?</h2>

A simple routing architecture is usually better than using one model for everything:

1. Start with **Luna** for field extraction, labeling, controlled summarization, and high volumes of low-risk work.
2. Choose **Terra** for product conversations, routine enterprise automation, and stages that need good quality with controlled cost.
3. Reserve **Sol** for difficult, ambiguous, or high-risk problems where the quality gain justifies greater cost and latency.
4. Escalate borderline output to a stronger model or human review—for example, when confidence is low, a test fails, or an action with external impact is proposed.

Ultimately, model selection is an engineering hypothesis. Test it on real examples, record escalation thresholds, and repeat the evaluation whenever the model or its pricing changes.

<h2 id="sources">Sources</h2>

- [GPT-5.6: Frontier intelligence that scales with your ambition — OpenAI, July 9, 2026](https://openai.com/index/gpt-5-6/)
- [GPT-5.6 System Card — OpenAI Deployment Safety Hub, July 9, 2026](https://deploymentsafety.openai.com/gpt-5-6)
- [GPT-5.6 model guide — OpenAI Developers](https://developers.openai.com/api/docs/guides/latest-model)
- [GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra), and [Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna)
- [API pricing — OpenAI Developers](https://developers.openai.com/api/docs/pricing)
- [Programmatic Tool Calling guide](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling) and [Multi-agent guide](https://developers.openai.com/api/docs/guides/tools-multi-agent)
- [Reasoning mode guide](https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode)
