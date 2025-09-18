client Claude {
    provider anthropic
    options {
        model claude-3-5-sonnet-20240620
        api_key env.ANTHROPIC_API_KEY
    }
}

class Resume {
    name string
    job_title string
    company string
    age int
}

function ExtractResume(resume: string) -> Resume {
    client Claude
    prompt #"
        {{ _.role('system') }}

        Extract the following information from the resume:

        Resume:
        <<<<
        {{ resume }}
        <<<<

        Output JSON schema:
        {{ ctx.output_format }}

        JSON:
    "#
}
