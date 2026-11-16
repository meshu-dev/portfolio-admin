<?php

use App\Actions\File\MoveFileAction;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Canvas;
use Dompdf\Dompdf;
use Dompdf\FontMetrics;
use Mockery\MockInterface;

describe('Commands\CreateCvPdf tests', function () {
    it('generates PDF', function () {
        // Arrange
        Storage::fake();

        $filename = 'cv.pdf';
        $cvFilePath  = storage_path('app/private') . '/' . $filename;

        $pdfMock = Pdf::shouldReceive('loadView')
            ->once()
            ->andReturnSelf()
            ->getMock();

        $pdfMock->shouldReceive('setPaper')
            ->once()
            ->withArgs(['A4', 'portrait']);

        $canvas = mock(Canvas::class);
        $canvas->shouldReceive('page_script')->once()->with(Closure::class);

        $fontMetrics = mock(FontMetrics::class);
        $fontMetrics->shouldReceive('getFont')->once()->with('Helvetica')->andReturn('Helvetica');

        $dompdf = mock(Dompdf::class);
        $dompdf->shouldReceive('getFontMetrics')->andReturn($fontMetrics);
        $dompdf->shouldReceive('getCanvas')->andReturn($canvas);

        $pdfMock->shouldReceive('render')->once();
        $pdfMock->shouldReceive('getDomPDF')->andReturn($dompdf);

        $pdfMock->shouldReceive('save')
            ->once()
            ->with($cvFilePath);

        $fileUrl = 'http://s3bucket.amazon.com/cv.pdf';

        $moveFileAction = mock(MoveFileAction::class, function (MockInterface $mock) use ($fileUrl) {
            $mock->shouldReceive('execute')
                ->once()
                ->with('cv.pdf')
                ->andReturn($fileUrl);
        });

        $this->app->bind(MoveFileAction::class, fn () => $moveFileAction);

        // Act
        $this->artisan('app:create-cv-pdf')->assertExitCode(0);

        // Assert
        $this->assertDatabaseHas('files', [
            'name' => $filename,
            'url' => $fileUrl,
        ]);
    });
});
