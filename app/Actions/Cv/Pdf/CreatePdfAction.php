<?php

namespace App\Actions\Cv\Pdf;

use App\Actions\File\MoveFileAction;
use App\Enums\FileTypeEnum;
use App\Models\File;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as PdfWrapper;
use Dompdf\Canvas;
use Dompdf\FontMetrics;

class CreatePdfAction
{
    protected const string FILENAME = 'cv.pdf';

    public function __construct(
        protected GetCvDataForPdfAction $getCvPdfAction
    ) {
    }

    /**
     * @return void
     */
    public function execute(int $userId): void
    {
        // Get CV Data
        $viewParams  = [...$this->getCvPdfAction->execute($userId)];

        // Generate PDF
        $cvFilePath  = storage_path('app/private') . '/' . self::FILENAME;

        $pdf = Pdf::loadView('pdf/cv', $viewParams);
        $pdf->setPaper('A4', 'portrait');
        $this->addPageNumbers($pdf, $viewParams['profile']['fullname'] ?? '');
        $pdf->save($cvFilePath);

        // Transfer local CV.pdf to S3
        $fileUrl = resolve(MoveFileAction::class)->execute(self::FILENAME);

        // Create file DB data
        File::updateOrCreate(
            [
                'user_id' => $userId,
                'type' => FileTypeEnum::S3->value,
                'name' => self::FILENAME
            ],
            [
                'url'  => $fileUrl
            ]
        );
    }

    /**
     * Adds "Name, page 2 of 3" to the bottom right of every page of a CV that runs over more than one,
     * so a loose page still says whose CV it is.
     */
    protected function addPageNumbers(PdfWrapper $pdf, string $name): void
    {
        $pdf->render();

        $dompdf = $pdf->getDomPDF();
        $font   = $dompdf->getFontMetrics()->getFont('Helvetica') ?? 'Helvetica';

        $dompdf->getCanvas()->page_script(
            function (int $pageNumber, int $pageCount, Canvas $canvas, FontMetrics $fontMetrics) use ($font, $name) {
                if ($pageCount < 2) {
                    return;
                }

                $text  = trim($name . ', page ' . $pageNumber . ' of ' . $pageCount, ', ');
                $size  = 8;
                $width = $fontMetrics->getTextWidth($text, $font, $size);

                // 42pt is the page's 56px side margin
                $canvas->text($canvas->get_width() - 42 - $width, $canvas->get_height() - 30, $text, $font, $size, [0.29, 0.35, 0.44]);
            }
        );
    }
}
