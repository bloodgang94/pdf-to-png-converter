import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';
import { PngPageOutput, pdfToPng } from '../src';
import { comparePNG } from '../src/compare.png';

const pdfFilePath: string = resolve('./test-data/large_pdf.pdf');

test(`should convert PDF To PNG buffer (without saving to file)`, async () => {
    const pngPages: PngPageOutput[] = await pdfToPng(pdfFilePath, {
        viewportScale: 2.0,
    });

    pngPages.forEach((pngPage: PngPageOutput) => {
        const expectedFilePath: string = resolve('./test-data/pdf.to.buffer/expected', pngPage.name);
        const compareResult: number = comparePNG({
            actualFile: pngPage.content,
            expectedFile: expectedFilePath,
            createExpectedFileIfMissing: false,
        });

        expect(existsSync(pngPage.path)).to.equal(false);
        expect(compareResult).to.equal(0);
    });
});
