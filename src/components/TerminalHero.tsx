import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const codeLines = [
	{ text: "const developer = {", color: "text-primary" },
	{ text: '  name: "Aashish Bagmar",', color: "text-cyan-400" },
	{ text: '  role: "Full-Stack ML & Data Engineer",', color: "text-green-400" },
	{ text: '  status: "Open to Opportunities! 🚀"', color: "text-amber-400" },
	{ text: "};", color: "text-primary" },
	{ text: "", color: "" },
	{ text: "developer.sayHello();", color: "text-pink-400" },
];

const TerminalHero = () => {
	const [displayedLines, setDisplayedLines] = useState<string[]>([]);
	const [currentLine, setCurrentLine] = useState(0);
	const [currentChar, setCurrentChar] = useState(0);
	const [showCursor, setShowCursor] = useState(true);
	const [isComplete, setIsComplete] = useState(false);
	const terminalRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	// Cursor blink effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	// Typing effect
	useEffect(() => {
		if (currentLine >= codeLines.length) {
			setIsComplete(true);
			return;
		}

		const line = codeLines[currentLine].text;

		if (currentChar < line.length) {
			const timeout = setTimeout(() => {
				setDisplayedLines((prev) => {
					const newLines = [...prev];
					if (!newLines[currentLine]) newLines[currentLine] = "";
					newLines[currentLine] = line.slice(0, currentChar + 1);
					return newLines;
				});
				setCurrentChar((c) => c + 1);
			}, 30 + Math.random() * 20);
			return () => clearTimeout(timeout);
		} else {
			const timeout = setTimeout(() => {
				setCurrentLine((l) => l + 1);
				setCurrentChar(0);
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [currentLine, currentChar]);

	// GSAP animations with GPU acceleration for smooth performance
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(titleRef.current, {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: "power4.out",
				delay: 0.2,
				force3D: true,
			});

			gsap.from(terminalRef.current, {
				scale: 0.8,
				opacity: 0,
				duration: 0.8,
				ease: "back.out(1.7)",
				delay: 0.5,
				force3D: true,
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			id="home"
			className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20"
		>
			<div className="max-w-5xl w-full mx-auto">
				{/* Hero title */}
				<div ref={titleRef} className="text-center mb-8 sm:mb-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
						<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
						<span className="text-sm text-muted-foreground">
							Available for work
						</span>
					</div>
					<h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
						<span className="text-gradient">Creative</span> Developer
					</h1>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
						Turning ideas into interactive experiences
					</p>
				</div>

				{/* Terminal window */}
				<div
					ref={terminalRef}
					className="relative rounded-2xl overflow-hidden glass-strong border border-border/50 shadow-2xl"
				>
					{/* Terminal header */}
					<div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-card/50">
						<div className="flex gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500/80" />
							<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
							<div className="w-3 h-3 rounded-full bg-emerald-500/80" />
						</div>
						<span className="text-xs text-muted-foreground ml-4 font-mono">
							~/portfolio/developer.js
						</span>
					</div>

					{/* Terminal content */}
					<div className="p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed min-h-[300px] sm:min-h-[360px]">
						{/* Line numbers + code */}
						{codeLines.map((line, idx) => (
							<div key={idx} className="flex">
								<span className="w-6 sm:w-8 text-muted-foreground/50 text-right mr-4 select-none">
									{idx + 1}
								</span>
								<span className={line.color}>
									{displayedLines[idx] || ""}
									{idx === currentLine && !isComplete && (
										<span
											className={`inline-block w-2 h-5 ml-0.5 align-middle ${
												showCursor ? "bg-primary" : "bg-transparent"
											}`}
										/>
									)}
								</span>
							</div>
						))}

						{/* Output message after typing complete */}
						{isComplete && (
							<div className="mt-4 pt-4 border-t border-border/30">
								<div className="flex items-center gap-2">
									<span className="text-emerald-400">→</span>
									<span className="text-foreground animate-pulse">
										Hello! Let's build something amazing together 👋
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Quick stats */}
				<div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
					{[
						{ label: "Projects", value: "25+" },
						{ label: "Technologies", value: "35+" },
						{ label: "Cups of Coffee", value: "∞" },
					].map((stat, idx) => (
						<div key={idx} className="text-center">
							<div className="font-display text-2xl sm:text-3xl font-bold text-gradient">
								{stat.value}
							</div>
							<div className="text-xs sm:text-sm text-muted-foreground mt-1">
								{stat.label}
							</div>
						</div>
					))}
				</div>

				
			</div>
		</section>
	);
};

export default TerminalHero;
