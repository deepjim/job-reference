/*

CSCI 3280, Introduction to Multimedia Systems
Spring 2015

Assignment 01 Skeleton
Name: Chim Wing Tat
Sid: 1155032378
bonus.cpp

*/

#include "stdio.h"
#include "malloc.h"
#include "memory.h"
#include "math.h"
#include "bmp.h"		//	Simple .bmp library

#define MAX_SHADES 8


//
//	***** PUT ALL YOUR CODE INSIDE main() *****
//
int main(int argc, char** argv)
{

	char shades[MAX_SHADES] = { ' ', 'D', 'E', 'P', 'C', 'H', 'I', 'M' };
	int	w, h, i = 0, j = 0, k;
	double gray;
	unsigned char R, G, B;
	//	Read in image data ( command line: argv[1] )
	//
	Bitmap myBmp(argv[1]);

	w = myBmp.getWidth();
	h = myBmp.getHeight();

	//	Prepare output TXT file ( command line: argv[2] )
	//
	FILE *fout = fopen(argv[2], "w");
	
	fprintf(fout, "<!DOCTYPE html>\n<html>\n<body>\n");
	fprintf(fout, "<canvas id=\"Canvas\" width=\"1200\" height=\"1200\"\nYour browser does not support the canvas element.\n</canvas>\n");
	fprintf(fout, "<style>\nbody{background-color: lightgrey; }\n</style>\n");
	fprintf(fout, "<script>\n");
	fprintf(fout, "var canvas = document.getElementById(\"Canvas\");\nvar ctx = canvas.getContext(\"2d\"); \n");
	fprintf(fout, "ctx.fillText(\"%d %d\",%d,%d)\;\n", w, h,10,10);
		for (i = 0; i < h; i++) {
			for (j = 0; j < w; j++) {
				myBmp.getColor(j, i, R, G, B);
				gray = (0.299*R + 0.587*G + 0.114*B) / 32;

				for (k = 0; k <= MAX_SHADES; k++) {
					if (int(gray) == k) {
						fprintf(fout, "ctx.fillStyle = \'#%x%x%x\'\;\n", R, G, B);
						fprintf(fout, "ctx.fillText(\"%c\",%d,%d)\;\n", shades[k], j * 11 + 20, i * 11 + 20);
					}
				}

			}
		}
	//}
	//	close ASCII file
	
	fprintf(fout, "</script>\n</body>\n</html>\n");
	fclose(fout);
	return 0;

}
